//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useRoute, useMemo } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Tile from "./tile";
import ResolvedTile from "./resolved-tile";
import UserListView from "./user-list-view.js";
import Config from "./config/config.js";
import { useJokes } from "../context-list.js";
import CreateUserView from "./create-user-view.js";
import NewTitleView from "./new-title-view.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  mainContainer: () =>
  Config.Css.css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // center items vertically in the container
    width: '100%', // take full width
    maxWidth: '800px', // Adjust this value as needed
    margin: '0 auto', 
  }),
  
  headerStyle: () =>
    Config.Css.css({
      textAlign: "center",
      width: "100%",
    }),

  listViewTile: () =>
    Config.Css.css({
      width: "100%",
      margin: "10px auto",
      padding: "10px",
      backgroundColor: "#ffffff", // Changed tile background color
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)", // Softer shadow
      borderRadius: "10px",
      transition: "transform 0.2s, box-shadow 0.2s", // Smoother transition
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 6px 12px 0 rgba(0,0,0,0.2)",
      },
    }),

  userListView: () =>
    Config.Css.css({
      width: "100%", // Full width to maintain consistency
      maxWidth: "600px", // Adjust this value based on your design requirements
      margin: "20px auto", // Vertical margin for spacing, centered horizontally
      padding: "15px", // Inner spacing
      backgroundColor: "#f5f5f5", // A light grey background color for contrast
      borderRadius: "8px", // Slightly rounded corners for a softer look
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // A subtle shadow for depth
    }),
};
//@@viewOff:css

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shoppingList: [],
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const { jokeDataList, isUserOwner } = useJokes();
    const [route] = useRoute();
    const detailId = route.params.id;

    const shoppingListDetail = useMemo(() => {
      return jokeDataList.data?.find((shoppingList) => {
        return shoppingList.data.id === detailId;
      });
    }, [jokeDataList, detailId]);

    console.log(shoppingListDetail.data);

    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDelete(event) {
      const item = event.data;

      try {
        jokeDataList.handlerMap.deleteItem();
        addAlert({
          message: `The joke ${"..."} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error deleting list", error);
        showError(error, "List delete failed!");
      }
    }

    function handleUpdate(event) {
      const id = event;

      try {
        jokeDataList.handlerMap.resolveItem();
        addAlert({
          message: `The item ${"dd"} has been resolved.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error resolving item", error);
        showError(error, "Item resolve failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs} className={Css.mainContainer()}>
        <h1 className={Css.headerStyle()}>USER LIST</h1>

        {isUserOwner(detailId) && (
          <div>
            <NewTitleView />
            <CreateUserView />
          </div>
        )}
        <div className={Css.userListView()}>
          <UserListView shoppingList={shoppingListDetail.data} />
        </div>
        <h2> {shoppingListDetail.data.name}</h2>
        {shoppingListDetail.data.shoppingListItems?.map((item) => {
          return (
            <Tile
              key={item.id}
              item={item}
              className={Css.listViewTile()}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          );
        })}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListView as ListView };
export default ListView;
//@@viewOff:exports
