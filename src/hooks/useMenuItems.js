import { useState, useEffect } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import { database } from "../firebase/config";
import Swal from "sweetalert2";

const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const menuItemsRef = ref(database, "menuItems");
    onValue(menuItemsRef, (snapshot) => {
      const items = snapshot.val();
      const menuList = items
        ? Object.keys(items).map((key) => ({ id: key, ...items[key] }))
        : [];
      setMenuItems(menuList);
    });
  }, []);
  //   add items on the database
  const addMenuItem = (item) => {
    const menuItemsRef = ref(database, "menuItems");
    Swal.fire({
      title: "Successfully Added",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    push(menuItemsRef, item);
  };

  //   update current
  const updateMenuItem = (id, updatedItem) => {
    const menuItemRef = ref(database, `menuItems/${id}`);
    Swal.fire({
      title: "Successfully Update",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    update(menuItemRef, updatedItem);
  };

  const deleteMenuItem = (id) => {
    const menuItemRef = ref(database, `menuItems/${id}`);
    Swal.fire({
      title: "Do you want delete this menu?",
      icon: "info",
      timer: 1000,
      showConfirmButton: true,
      showCancelButton: true,
      customClass: {
        confirmButton: "confirm-button",
        cancelButton: "cancel-button",
      },
      buttonsStyling: false, // Disable default styling to apply custom styles
    }).then((result) => {
      if (result.isConfirmed) {
        remove(menuItemRef);
      } else if (result.isDenied) {
        Swal.fire("Menu is not deleted", "", "info");
      }
    });
  };

  return {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};

export default useMenuItems;
