import { useContext, useState } from "react";
import { VendorContext } from "../../context/VendorContext";
import { toast } from "react-toastify";

export default function Vendor({
  id,
  brand,
  owner,
  phone,
  logo,
  location,
  onZoom,
}) {
  const [moreOptionsList, setMoreOptionsList] = useState(false);
  const { setVendors, setAddVendorForm, setFormData } =
    useContext(VendorContext);

  const handleMenuClick = () => {
    setMoreOptionsList((prev) => !prev);
  };

  const handleOptionClick = (callback) => {
    callback?.();
    setMoreOptionsList(false);
  };

  const handleDeleteVendor = (id) => {
    if (!window.confirm("آیا از حذف این همکار مطمئن هستید؟")) return;
    setVendors((prev) => {
      const deleted = prev.find((v) => v.id === id);
      toast.success(`${deleted.brand} حذف شد!`);
      return prev.filter((v) => v.id !== id);
    });
  };

  const handleEditVendor = () => {
    setAddVendorForm(true);
    setFormData({ brand, owner, phone, logo, location, id });
  };

  return (
    <div className="vendor-box">
      <div className="vendor-content">
        <div className="vendor-content1">
          <span
            onClick={handleMenuClick}
            style={{ cursor: "pointer", userSelect: "none" }}
            className="circle-menu"
          >
            ...
          </span>
          <span style={{ fontWeight: "bolder", fontSize: 18 }}>{brand}</span>

          <ul
            className={`vendor-menu ${moreOptionsList ? "show" : ""}`}
            onMouseLeave={() => setMoreOptionsList(false)}
          >
            <li onClick={() => handleEditVendor()}>ویرایش اطلاعات</li>
            <li onClick={() => handleDeleteVendor(id)}>حذف همکار</li>
            <li onClick={() => handleOptionClick(onZoom)}>نمایش روی نقشه</li>
          </ul>
        </div>

        <div className="vendor-content2">
          <span style={{ fontSize: 14 }}>تماس: {phone}</span>
          <span style={{ fontSize: 14 }}>مسئول: {owner}</span>
        </div>
      </div>

      <div className="vendor-logo">
        <img src={logo} alt={brand} />
      </div>
    </div>
  );
}
