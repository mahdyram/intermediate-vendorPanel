import { useContext } from "react";
import { VendorContext } from "../../context/VendorContext";

export default function Toolbar() {
  const { search, setSearch, setAddVendorForm } = useContext(VendorContext);

  return (
    <div className="toolbar-box">
      <input
        type="text"
        placeholder="جستجوی همکار"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setAddVendorForm(true)}>افزودن همکار</button>
    </div>
  );
}
