import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import UserProfileService from "../../services/profile.services";
import { AuthContext } from "../../context/auth.contex";
import Spinner from "../Spinner/Spinner";

export default function SidebarLayout() {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        getProfileData();
    }, []);

    async function getProfileData() {
        setIsLoading(true);
        try {
            const userProfileService = new UserProfileService(token);
            const response = await userProfileService.getProfile();

            if (response) {
                setIsLoading(false);
                setProfileData({
                  firstName: response.first_name,
                  lastName: response.last_name,
                  image: response.image
                });
            }
        } catch (error) {
            console.log("Unexpected error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ? (
                <div className="mt-4 px-4">
                <Spinner />
              </div>
            ) : (
                <div className="row g-0">
                    <div className="col-2">
                        <Sidebar profile={profileData}/>
                    </div>
                    <div className="col-10 px-4 py-3 text-white">
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    );
}
