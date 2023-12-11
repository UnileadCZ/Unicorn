//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { useAlertBus } from "uu5g05-elements";
import ListsTile from "./lists-tile.js";
import { useJokes } from "../context-list.js";
import { useState } from "uu5g05";
import CreateListView from "./create-list-view.js";
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
  text-align: center;

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
    display: inline-block;
  }

  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap; // Enable wrapping of child elements
    margin-bottom: 10px;
  }

  @media (max-width: 600px) { // Adjust this value based on your requirements
    padding: 10px;
    .toggle-button {
      padding: 5px 10px;
      font-size: 0.8em;
    }

    > div {
      display: block; // Stack the elements vertically on smaller screens
    }
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
    const { jokeDataList } = useJokes();
    const { addAlert } = useAlertBus();
    // const activeList = getActiveLists();
    // const archivedList = getArchivedLists();
    // const [showArchived, setShowArchived] = useState(false);

     function showError(error, header = "") {
       addAlert({
         header,
         message: error.message,
         priority: "error",
       });
     }

    function handleDelete(event) {
      // const list = event.data.id;
       try {
        jokeDataList.handlerMap.deleteList()
         addAlert({
           message: `list has ${event.data.data.name} been deleted.`,
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
             jokeDataList.handlerMap.updateName()
         addAlert({
           message: `The list ${event.data.data.name} has been archived.`,
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
    // const listsToDisplay = showArchived ? archivedList : activeList;
    return (
      <div {...attrs}>
        {/* Button to toggle between archived and active lists */}
        {/* <button className="toggle-button" onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "Show Active Lists" : "Show Archived Lists"}
        </button> */}

        {/* Render either archived or active lists based on the state */}
        <CreateListView onCreate={jokeDataList.handlerMap.create}/>
        {jokeDataList.data.map((list) => (
          <div>
            <ListsTile
              key={list.id}
              list={list}
              // selectList={selectList}
              onUpdate={handleUpdate}
              // selected={list.id === currentListId}
              onDelete={handleDelete}
              // isArchived={showArchived}
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
