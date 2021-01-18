import pic1 from "../pictures/mocked_img_1.jpg";
import pic2 from "../pictures/mocked_img_2.jpg";
import pic3 from "../pictures/mocked_img_3.jpg";

const mockedUser = {
  username: "romyagchenkov",
  name: "Roman",
  followers: ["user2", "user3", "user4"],
  following: ["user2", "user3", "user4"],
  pictures: [pic1, pic2, pic3],
};

export default mockedUser;

//const [state, setState] = useState({
//      name: 'Param',
//     email: 'param@gmail.com',
//   });

// <Profile {...state} />
// const Profile = props => {
