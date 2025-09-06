import { useContext, useEffect, useState } from "react";
import Toolbar from "./ToolBar";
import Vendor from "./Vendor";
import { VendorContext } from "../../context/VendorContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Main() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const resetFormData = {
    brand: "",
    owner: "",
    logo: "",
    phone: "",
    location: [],
    id: "",
  };

  const {
    vendors,
    setVendors,
    search,
    addVendorForm,
    setAddVendorForm,
    formData,
    setFormData,
  } = useContext(VendorContext);

  const filteredVendors = vendors.filter((v) => {
    const searchWords = search.split(" ").filter(Boolean);
    return searchWords.every((word) => v.brand.includes(word));
  });

  const HandleClickOnMap = () => {
    useMapEvents({
      click: (e) => {
        setFormData((prev) => ({
          ...prev,
          location: [e.latlng.lat, e.latlng.lng],
        }));
      },
    });
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(resetFormData);
    setAddVendorForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setVendors((prev) =>
        prev.map((v) => (v.id === formData.id ? { ...formData } : v))
      );
    } else {
      setVendors((prev) => [
        ...prev,
        {
          ...formData,
          id: crypto.randomUUID(),
        },
      ]);
    }

    setFormData(resetFormData);
    setAddVendorForm(false);
    toast.success("تغیرات ذخیره شد");
  };

  return (
    <main>
      <Toolbar />

      <div className="main-content">
        {!addVendorForm ? (
          <div className="vendors">
            {filteredVendors.map((v) => (
              <Vendor
                key={v.id}
                {...v}
                onZoom={() => setSelectedLocation(v.location)}
              />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontWeight: "bolder", fontSize: 17 }}>
              افزودن همکار جدید
            </p>

            <label htmlFor="brand">نام برند</label>
            <input
              type="text"
              id="brand"
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
            />
            <label htmlFor="owner">نام و نام خانوادگی مسئول</label>
            <input
              type="text"
              id="owner"
              name="owner"
              required
              value={formData.owner}
              onChange={handleChange}
            />

            <label htmlFor="logo">آدرس تصویر لوگو</label>
            <input
              type="text"
              id="logo"
              name="logo"
              required
              value={formData.logo}
              onChange={handleChange}
            />
            <label htmlFor="phone">شماره تماس</label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <label
              htmlFor="location"
              id="locationLabel"
              title="روی آدرس وندور در نقشه کلیک کنید"
            >
              {" "}
              (!) مختصات
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              readOnly
              value={formData.location}
              onChange={handleChange}
            />

            <button type="submit">ذخیره تغییرات / افزودن</button>
            <button type="button" onClick={handleCancel}>
              انصراف
            </button>
          </form>
        )}

        <div className="map">
          <MapContainer
            center={[35.7, 51.4]}
            zoom={11}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='<a href="">VendorPanel</a>'
            />

            {selectedLocation && <MapFocus target={selectedLocation} />}

            {/* marker ها */}
            {filteredVendors.map((v) => (
              <Marker key={v.id} position={v.location}>
                <Popup>
                  <b>{v.brand}</b> <br />
                  {v.owner} <br />
                  {v.phone}
                </Popup>
              </Marker>
            ))}

            {/* marker موقت برای فرم در حال ساخت */}
            {formData.location.length > 0 && (
              <Marker position={formData.location} icon={redIcon}>
                <Popup>مکان انتخاب‌ شده</Popup>
              </Marker>
            )}

            <HandleClickOnMap />
          </MapContainer>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnHover
      />
    </main>
  );
}

function MapFocus({ target }) {
  const map = useMap();

  useEffect(() => {
    map.setView(target, 16, { animate: true });
  }, [target, map]);

  return null;
}
