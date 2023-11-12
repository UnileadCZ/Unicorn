//@@viewOn:imports
import { useEffect } from "uu5g05";
import { createComponent, Utils, useState } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

const initialJokeList = {
  id: "123456",
  listName: "John list",
  userList: [
    { id: Utils.String.generateId(), name: "John" },
    { id: Utils.String.generateId(), name: "Jacob" },
    { id: Utils.String.generateId(), name: "Daniel" },
  ],
  singleShoppingList: [
    {
      id: Utils.String.generateId(),
      name: "Banana",
    },
    {
      id: Utils.String.generateId(),
      name: "Egg",
    },
  ],

  resolvedShoppingLists: [
    {
      id: Utils.String.generateId(),
      name: "Bread",
    },
  ],
};

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [showResolved, setShowResolved] = useState(false);
    const [shoppingList, setShoppingList] = useState(initialJokeList);
    const [resolvedShoppingList, setResolvedShoppingList] = useState(initialJokeList.resolvedShoppingLists);

    useEffect(() => {
      console.log(resolvedShoppingList);
      console.log(shoppingList.singleShoppingList);
    }, [resolvedShoppingList]);

    function remove(list) {
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        singleShoppingList: prevShoppingList.singleShoppingList.filter((item) => item.id !== list.id),
      }));
    }

    function removeUser(list) {
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        userList: prevShoppingList.userList.filter((item) => item.id !== list.id),
      }));
    }

    function create(values) {
      const list = {
        ...values,
        id: Utils.String.generateId(),
        sys: {
          cts: new Date().toISOString(),
        },
      };

      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        singleShoppingList: [...prevShoppingList.singleShoppingList, list],
      }));

      return list;
    }

    function createUser(values) {
      const user = {
        ...values,
        id: Utils.String.generateId(),
      };

      setShoppingList((prevUserList) => ({
        ...prevUserList,
        userList: [...prevUserList.userList, user],
      }));

      return user;
    }

    function update(id) {
      console.log("Updating joke with id:", id);
      setShoppingList((prevShoppingList) => {
        const updatedList = prevShoppingList.singleShoppingList.find((item) => item.id === id);
        setResolvedShoppingList((prevResolved) => [...prevResolved, updatedList]);
        console.log("Joke updated. Moving to resolvedShoppingLists:", updatedList);

        return {
          ...prevShoppingList,
          singleShoppingList: prevShoppingList.singleShoppingList.filter((item) => item.id !== id),
          resolvedShoppingLists: [...prevShoppingList.resolvedShoppingLists, updatedList],
        };
      });
    }

    function changeListName(value) {
      setShoppingList((prevList) => ({
        ...prevList,
        listName: value,
      }));
    }

    //@@viewOff:private

    //@@viewOn:render
    const value = {
      shoppingList,
      remove,
      update,
      create,
      removeUser,
      createUser,
      changeListName,
      showResolved,
      setShowResolved,
    };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
