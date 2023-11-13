//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { useAlertBus } from "uu5g05-elements";
import ListsTile from "./lists-tile.js";
import { useJokes } from "../list-context.js";
import { useState } from "uu5g05";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css`
  padding: 20px;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
  background-color: #f8f8f8;
  text-align: center; // Center-aligns inline or inline-block elements like buttons

  .toggle-button {
    background-color: #e6e6e6;
    border: 1px solid #c0c0c0;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 30px;
    font-weight: bold;
    color: #333;
    transition: background-color 0.3s;
    display: inline-block; // Makes the button an inline-block element

    &:hover {
      background-color: #dcdcdc;
    }
  }

  // Styling for the list tiles container
  > div {
    display: flex;
    justify-content: center; // Centers the child elements (list tiles)
    margin-bottom: 10px; // Optional: Adds some spacing between the list tiles
  }
  `,
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListsView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { currentListId, selectList, getArchivedLists, getActiveLists } = useJokes();
    const { addAlert } = useAlertBus();
    const activeList = getActiveLists();
    const archivedList = getArchivedLists();
    const [showArchived, setShowArchived] = useState(false);

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDelete(event) {
      const list = event.data.id;
      try {
        props.onDelete(list);
        addAlert({
          message: `The list ${event.data.listName} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListsView.logger.error("Error deleting list", error);
        showError(error, "List delete failed!");
      }
    }

    function handleUpdate(event) {
      const list = event.data;
      try {
        props.onUpdate(list.id);
        addAlert({
          message: `The list ${list.listName} has been archived.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error archiving list", error);
        showError(error, "List archive failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const listsToDisplay = showArchived ? archivedList : activeList;
    return (
      <div {...attrs}>
        {/* Button to toggle between archived and active lists */}
        <button className="toggle-button" onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "Active Lists" : "Archived Lists"}
        </button>

        {/* Render either archived or active lists based on the state */}
        {listsToDisplay.map((list) => (
          <div>
            <ListsTile
              key={list.id}
              list={list}
              selectList={selectList}
              onUpdate={handleUpdate}
              selected={list.id === currentListId}
              onDelete={handleDelete}
              isArchived={showArchived}
            />
          </div>
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsView };
export default ListsView;
//@@viewOff:exports
