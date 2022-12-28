import { mergeDefaultProps } from "@kobalte/utils";
import { createUniqueId, ParentComponent } from "solid-js";

import { useMenuContext } from "./menu-context";
import { MenuRoot, MenuRootProps } from "./menu-root";

export interface MenuSubProps
  extends Omit<
    MenuRootProps,
    "onAction" | "isModal" | "preventScroll" | "trapFocus" | "autoFocus" | "restoreFocus"
  > {}

/**
 * Contains all the parts of a submenu.
 */
export const MenuSub: ParentComponent<MenuSubProps> = props => {
  const parentMenuContext = useMenuContext();

  if (parentMenuContext === undefined) {
    throw new Error("[kobalte]: `Menu.Sub` must be used within a `Menu` component");
  }

  const defaultId = `menu-sub-${createUniqueId()}`;

  props = mergeDefaultProps(
    {
      id: defaultId,
      placement: "right-start",
    },
    props
  );

  return (
    <MenuRoot
      isModal={parentMenuContext.isModal()}
      onAction={parentMenuContext.onAction}
      {...props}
    />
  );
};
