import pic1 from "../pictures/mocked_img_1.jpg";
import pic2 from "../pictures/mocked_img_2.jpg";
import pic3 from "../pictures/mocked_img_3.jpg";

const mockedUser = {
  username: "romyagchenkov",
  name: "Roman",
  avatar: "",
  followers: ["user2", "user3", "user4"],
  following: ["user2", "user3", "user4"],
  pictures: [
    { pic: pic1, id: 1 },
    { pic: pic3, id: 3 },
    { pic: pic2, id: 2 },
    { pic: pic1, id: 4 },
  ],
};

export default mockedUser;

//const [state, setState] = useState({
//      name: 'Param',
//     email: 'param@gmail.com',
//   });

// <Profile {...state} />
// const Profile = props => {
