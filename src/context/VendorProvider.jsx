import { useState } from "react";
import { VendorContext } from "./VendorContext";
import { defaultVendors } from "../components/main/defaultVendors";

export default function VendorProvider({ children }) {
  const [vendors, setVendors] = useState(defaultVendors);
  const [search, setSearch] = useState("");
  const [addVendorForm, setAddVendorForm] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    owner: "",
    logo: "",
    phone: "",
    location: [],
    id: "4",
  });

  const value = {
    vendors,
    setVendors,
    search,
    setSearch,
    addVendorForm,
    setAddVendorForm,
    formData,
    setFormData,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
}
