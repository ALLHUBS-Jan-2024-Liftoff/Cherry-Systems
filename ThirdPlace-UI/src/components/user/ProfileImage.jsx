import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import plant0 from '../../assets/plant0.png';
import plant1 from '../../assets/plant1.png';
import plant2 from '../../assets/plant2.png';
import plant3 from '../../assets/plant3.png';
import plant4 from '../../assets/plant4.png';
import plant5 from '../../assets/plant5.png';

const ProfileImage = ({otherUser}) => {
    const { user } = useAuth();
    const [img, setImg] = useState(plant0);

    const propOtherUser = otherUser;

    const [selectedUserImg, setSelectedUser] = useState(user.profileImage);

    useEffect(() => {
        if (propOtherUser) {
            setSelectedUser(propOtherUser.profileImage)
        }
        currentProfileImage();
    }, [propOtherUser]);

    const currentProfileImage = () => {
        if (selectedUserImg === 0) {
            setImg(plant0);
        } else if (selectedUserImg === 1) {
            setImg(plant1)
        } else if (selectedUserImg === 2) {
            setImg(plant2)
        } else if (selectedUserImg === 3) {
            setImg(plant3)
        } else if (selectedUserImg === 4) {
            setImg(plant4)
        } else if (selectedUserImg === 5) {
            setImg(plant5)
        }
    }

    return (
        <div className='profileImg-div'>
            <img src={img} className='profileImg'></img>
        </div>
    )
}

export default ProfileImage;