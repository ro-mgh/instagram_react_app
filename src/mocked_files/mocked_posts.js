import pic1 from "../pictures/mocked_img_1.jpg";
import pic2 from "../pictures/mocked_img_2.jpg";
import pic3 from "../pictures/mocked_img_3.jpg";

const post1 = {
  username: "User1",
  avatar: "",
  post: pic1,
  likes: 20,
  comments: [
    { id: 1, name: "user3", text: "Heey nice!" },
    { id: 2, name: "user4", text: "Heey sooo cool!" },
  ],
};
const post2 = {
  username: "User2",
  avatar: "",
  post: pic2,
  likes: 30,
  comments: [
    { id: 3, name: "user1", text: "Ooooh!" },
    { id: 4, name: "user4", text: "Cool!" },
  ],
};
const post3 = {
  username: "User3",
  avatar: "",
  post: pic3,
  likes: 5,
  comments: [{ id: 5, name: "user2", text: "Fine)" }],
};

const postsArr = [post1, post2, post3];

export default postsArr;

//const [state, setState] = useState({
//      name: 'Param',
//     email: 'param@gmail.com',
//   });

// <Profile {...state} />
// const Profile = props => {
