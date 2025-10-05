"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/customer-account/Sidebar";
import { ProfileCard } from "@/components/customer-account/ProfileCard";
import { AddressData } from "@/components/customer-account/AddressFields";
import { EditProfileForm } from "@/components/customer-account/EditProfileForm";
import { EditAddressForm } from "@/components/customer-account/EditAddressForm";
import AddressCard from "@/components/customer-account/AddressCard";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/utils/profileApi";

interface UserData {
  name: string;
  email: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
  addresses?: AddressData[];
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    gender: "",
    addresses: [],
  });
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<AddressData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const transformAddressData = (addr: any): AddressData => ({
    firstName: addr?.firstName || addr?.FirstName || "",
    lastName: addr?.lastName || addr?.LastName || "",
    province: addr?.province || addr?.Provience || "",
    district: addr?.district || addr?.District || "",
    city: addr?.city || addr?.City || "",
    area: addr?.area || addr?.Area || "",
    houseNo: addr?.houseNo || addr?.HouseNo || "",
    postalCode: addr?.postalCode || addr?.PostalCode || "",
    country: addr?.country || addr?.Country || "United States",
    anyInformation: addr?.anyInformation || addr?.AnyInformation || "",
    _id: addr?._id,
    isDefault: addr?.isDefault || addr?.default || false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const profileRes = await getProfile();
        const profile = (profileRes as any).profile;

        setUserData({
          name: profile?.name || "",
          email: profile?.email || "",
          mobile: profile?.mobile || "",
          birthday: profile?.birthday || "",
          gender: profile?.gender || "",
          addresses: profile?.addresses || [],
        });

        const userAddresses = profile?.addresses || [];
        const normalized = userAddresses.map(transformAddressData);

        setAddresses(normalized);
      } catch (err: any) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveProfile = async (updatedData: UserData) => {
    try {
      setSaving(true);
      const res = await updateProfile(updatedData);
      // After saving, refetch full profile to ensure consistent shape and latest data
      const profileRes = await getProfile();
      const profile = (profileRes as any).profile ?? profileRes;
      if (profile) {
        setUserData({
          name: profile.name || "",
          email: profile.email || "",
          mobile: profile.mobile || "",
          birthday: profile.birthday || "",
          gender: profile.gender || "",
          addresses: profile.addresses || [],
        });
        setEditMode(false);
      }
    } catch (err: any) {
      setError(err.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAddress = async (address: AddressData) => {
    try {
      setSaving(true);
      // Use backend address API to persist
      await addAddress({
        firstName: address.firstName,
        lastName: address.lastName,
        province: address.province,
        district: address.district,
        city: address.city,
        area: address.area,
        houseNo: address.houseNo,
        postalCode: address.postalCode,
        country: address.country,
        anyInformation: address.anyInformation,
        isDefault: address.isDefault,
      });

      // Refetch full profile to sync UI
      const profileRes = await getProfile();
      const profile = (profileRes as any).profile;
      const userAddresses = profile?.addresses || [];
      const normalized = userAddresses.map(transformAddressData);
      setAddresses(normalized);
      setUserData({
        name: profile?.name || "",
        email: profile?.email || "",
        mobile: profile?.mobile || "",
        birthday: profile?.birthday || "",
        gender: profile?.gender || "",
        addresses: userAddresses,
      });
      setEditAddressMode(false);
      setCurrentAddress(null);
      toast.success("Address saved successfully");
    } catch (err: any) {
      setError(err.message || "Error saving address");
      toast.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!id) {
      toast.error("Invalid address ID");
      return;
    }

    try {
      setSaving(true);
      // Call backend delete endpoint (controller unsets address)
      await deleteAddress(id || "current");

      // Refetch to confirm removal
      const profileRes = await getProfile();
      const profile = (profileRes as any).profile;
      const userAddresses = profile?.addresses || [];
      const normalized = userAddresses.map(transformAddressData);
      setAddresses(normalized);
      setUserData({
        name: profile?.name || "",
        email: profile?.email || "",
        mobile: profile?.mobile || "",
        birthday: profile?.birthday || "",
        gender: profile?.gender || "",
        addresses: userAddresses,
      });
      toast.success("Address deleted successfully");
    } catch (err: any) {
      setError(err.message || "Error deleting address");
      toast.error("Failed to delete address");
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    if (!id) {
      toast.error("Invalid address ID");
      return;
    }

    try {
      setSaving(true);
      const updatedAddresses = addresses.map((a) => ({
        ...a,
        isDefault: a._id === id,
      }));

      const updatedUser = await updateProfile({
        ...userData,
        addresses: updatedAddresses,
      });

      if (updatedUser) {
        setUserData({
          ...userData,
          addresses: updatedUser.addresses || [],
        });
        setAddresses(updatedAddresses);
        toast.success("Default address updated successfully");
      }
    } catch (err: any) {
      setError(err.message || "Error setting default address");
      toast.error("Failed to set default address");
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-red-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <span className="text-red-700 dark:text-red-400">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            {editMode ? (
              <EditProfileForm
                userData={userData}
                onCancel={() => setEditMode(false)}
                onSave={handleSaveProfile}
                saving={saving}
              />
            ) : (
              <ProfileCard
                userData={userData}
                onEdit={() => setEditMode(true)}
              />
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-6">Address Book</h2>

            {editAddressMode ? (
              <EditAddressForm
                addressData={
                  currentAddress || {
                    firstName: "",
                    lastName: "",
                    province: "Northern",
                    district: "",
                    city: "",
                    area: "",
                    houseNo: "",
                    postalCode: "",
                    country: "Srilanka",
                    anyInformation: "",
                  }
                }
                onCancel={() => {
                  setEditAddressMode(false);
                  setCurrentAddress(null);
                }}
                onSave={handleSaveAddress}
                saving={saving}
              />
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setCurrentAddress(null);
                    setEditAddressMode(true);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Add New Address
                </button>

                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <AddressCard
                      key={address._id || Math.random().toString(36)}
                      addressData={address}
                      onEdit={() => {
                        setCurrentAddress(address);
                        setEditAddressMode(true);
                      }}
                      onDelete={handleDeleteAddress}
                      onSetDefault={handleSetDefaultAddress}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No addresses saved yet
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}