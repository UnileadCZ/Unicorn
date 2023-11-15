//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import { Button } from "uu5g05-elements";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ListView from "../bricks/list/list-view.js";
import CreateView from "../bricks/list/create-view.js";
import CreateUserView from "../bricks/list/generate-user-interface.js";
import NewTitleView from "../bricks/list/new-header-display.js";
import UserListView from "../bricks/list/user-list-view.js";
import { useJokes } from "../bricks/context-list.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css

const Css = {
  icon: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#4a4a4a", 
      marginRight: 0,
    }),
  screen: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      backgroundColor: "#e8eaf6", // Updated background color
      color: "#2c3e50", // Updated text color for contrast
      padding: "20px", // Added padding
      "@media (min-width: 768px)": {
        flexDirection: "row",
        padding: "40px", 
      },
    }),
  userListContainer: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 0,
      gap: 24, // Slightly larger gap for better spacing
      backgroundColor: "#fafafa", // Lighter background for the list
      padding: "30px", // Increased padding
      borderRadius: "12px", // More pronounced rounded corners
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.12)", // More prominent shadow
      maxWidth: "500px", //
    }),
  ListButtons: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      gap: 20,
      "@media (min-width: 768px)": {
        flexDirection: "row",
        justifyContent: "space-between", // Space out buttons on larger screens
      },
      button: {
        backgroundColor: "#81c535", // Updated button background color
        color: "#fff",
        padding: "12px 20px", // Slightly larger button padding
        borderRadius: "6px", // More rounded buttons
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s, background-color 0.3s", // Added scale transform
        display: "inline-flex", // Use flexbox for centering
        alignItems: "center", // Vertically center
        justifyContent: "center", // Horizontally center
        textAlign: "center", // Ensure text is centered
        lineHeight: "1", // Adjust line height to align text properly
        ":hover": {
          backgroundColor: "#6da92c", // Darker color on hover
          transform: "scale(1.05)", 
        },
      },
    }),
};

//@@viewOff:cs
let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  render() {
    const {
      lists,
      currentListId,
      createUser,
      selectList,
      create,
      update,
      remove,
      createItem,
      updateItem,
      removeItem,
      changeListName,
      removeUser,
      showResolved,
      setShowResolved,
      getSelectedListWithUnresolvedItems,
      getSelectedListWithResolvedItems,
      isUserOwner,
    } = useJokes();
    const unresolvedItemsList = getSelectedListWithUnresolvedItems();
    const resolvedItemsList = getSelectedListWithResolvedItems();
    const isOwner = isUserOwner(currentListId);
    const currentList = lists.find((list) => list.id === currentListId) || {};
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <div className={Css.screen()}>
          <div className={Css.userListContainer()}>
            <h1>Users</h1>
            {isOwner && <CreateUserView onCreate={createUser} style={{ maxWidth: 400, display: "block" }} />}
            <UserListView shoppingList={currentList} onDelete={removeUser} />
          </div>
          <div className={Css.icon()}>
            <h1>{currentList.listName}</h1>
            <NewTitleView changeListName={changeListName} style={{ maxWidth: 400, display: "block" }} />
            <div className={Css.ListButtons()}>
              <CreateView currentID={currentListId} onCreate={createItem} style={{ maxWidth: 400, display: "block" }} />
              <Button onClick={() => setShowResolved(!showResolved)}>{showResolved ? "Unsolved" : "Solved"}</Button>
            </div>
            <ListView
              id={currentListId}
              shoppingList={unresolvedItemsList || {}}
              showResolved={showResolved}
              resolvedItems={resolvedItemsList || []}
              onDelete={removeItem}
              onUpdate={updateItem}
            />
          </div>
        </div>
      </>
    );
    //@@viewOff:render
  },
});

List = withRoute(List, { authenticated: true });

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
