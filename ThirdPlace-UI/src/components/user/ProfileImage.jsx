import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import plant0 from '../../assets/plant0.png';
import plant1 from '../../assets/plant1.png';
import plant2 from '../../assets/plant2.png';
import plant3 from '../../assets/plant3.png';
import plant4 from '../../assets/plant4.png';
import plant5 from '../../assets/plant5.png';

const ProfileImage = () => {
    const { user } = useAuth();
    const [img, setImg] = useState(plant0);

    const currentProfileImage = () => {
        if (user.profileImage === 0) {
            setImg(plant0);
        } else if (user.profileImage === 1) {
            setImg(plant1)
        } else if (user.profileImage === 2) {
            setImg(plant2)
        } else if (user.profileImage === 3) {
            setImg(plant3)
        } else if (user.profileImage === 4) {
            setImg(plant4)
        } else if (user.profileImage === 5) {
            setImg(plant5)
        }
    }

    useEffect(() => {
        currentProfileImage();
    }, [])

    return (
        <>
            <img src={img}></img>
        </>
    )
}

export default ProfileImage;