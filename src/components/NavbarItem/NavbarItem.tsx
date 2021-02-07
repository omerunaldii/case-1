import React, { useState } from "react";

const NavItem = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item" onClick={() => setOpen(!open)}>
      <div className="nav-item--label"> {props.label} </div>
      {open && props.children}
    </li>
  );
}

export default NavItem;
