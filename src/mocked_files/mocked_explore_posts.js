import pic1 from "../pictures/mocked_img_1.jpg";
import pic2 from "../pictures/mocked_img_2.jpg";
import pic3 from "../pictures/mocked_img_3.jpg";

const mockedPictures = {
  pictures: [
    { pic: pic1, id: 1 },
    { pic: pic2, id: 2 },
    { pic: pic3, id: 3 },
    { pic: pic1, id: 4 },
    { pic: pic2, id: 5 },
    { pic: pic3, id: 6 },
  ],
};

export default mockedPictures;

//const [state, setState] = useState({
//      name: 'Param',
//     email: 'param@gmail.com',
//   });

// <Profile {...state} />
// const Profile = props => {
