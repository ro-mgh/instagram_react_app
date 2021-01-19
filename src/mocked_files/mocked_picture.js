import pic1 from "../pictures/mocked_img_1.jpg";
import pic2 from "../pictures/mocked_img_2.jpg";
import pic3 from "../pictures/mocked_img_3.jpg";

const mockedPicture = {
  id: 1,
  username: "User2",
  post: pic3,
  likes: 30,
  comments: [
    { id: 3, name: "user1", text: "Ooooh!" },
    { id: 4, name: "user4", text: "Cool!" },
  ],
};

export default mockedPicture;

//const [state, setState] = useState({
//      name: 'Param',
//     email: 'param@gmail.com',
//   });

// <Profile {...state} />
// const Profile = props => {
