import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { ProfileData } from "./UserProfile";
import './SpecficUserProfile.css';
import {
  MapPin,
  Mail,
  Calendar,
  Phone,
  User,
  MessageSquare,
  UserPlus,
} from "lucide-react";



const SpecficUserProfile: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [profile, setprofile] = useState<ProfileData>();
  const [loading, setLoading] = useState(true);

  const getSpecUserData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) {
      console.log(error);
    }
    console.log(data);
    setprofile(data);
    setLoading(false);
  };

  useEffect(() => {
    getSpecUserData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gray-900 w-full">
  <div className="max-w-6xl mx-auto">
    <div className="bg-gray-800 rounded-xl p-4 shadow-md">
      {/* Cover Photo */}
      <div className="relative h-56 rounded-lg overflow-hidden">
        {profile?.coverPhoto ? (
          <img
            src={profile.coverPhoto}
            alt={`${profile?.name || "User"} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Profile Data */}
        <div className="flex flex-col md:flex-row md:justify-start md:items-end gap-4 px-4 sm:px-6">
          {/* Everything on the RIGHT */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right space-y-4">
            
            {/* Profile Photo */}
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-gray-900 bg-gray-700 -mt-12 z-2">
              {profile?.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {/* Default placeholder icon here */}
                </div>
              )}
            </div>

            {/* Name and Role */}
            <div>
              <h1 className="text-2xl font-bold text-white">
                {profile?.name || ""}
              </h1>
               {profile?.role && (
                <div className="w-full text-center lg:text-start">
                  <p className="text-gray-300 text-sm mt-2">
                    {profile.role}
                  </p>
                </div>
              )}
            </div>

            {/* Other Details */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-300">
              {profile?.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  {profile.location}
                </span>
              )}
              {profile?.email && (
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  {profile.email}
                </span>
              )}
              {profile?.phone && (
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-4 h-4 text-yellow-400" />
                  {profile.phone}
                </span>
              )}
              {profile?.dob && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  {profile.dob}
                </span>
              )}
              {profile?.gender && (
                <span className="inline-flex items-center gap-1">
                  <User className="w-4 h-4 text-yellow-400" />
                  {profile.gender}
                </span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 mt-3 justify-center md:justify-end">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 text-sm font-semibold hover:bg-yellow-300 transition">
                <UserPlus className="w-4 h-4" />
                Connect
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">
                View Film Reel
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-100 text-sm hover:bg-gray-700 transition">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>
        </div>
    </div>
    {/* About Section*/}
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-white mt-4">
        <h2 className="text-2xl font-bold text-center">About</h2>
        <hr className="my-6 border-gray-600" />
        <p className="text-gray-300 text-lg leading-relaxed text-center">
           {profile?.bio}
          </p>
      </div>
      
    {/* Skills */}
    {profile?.skills?.length && (
   <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-white mt-4">
      <h2 className="text-2xl font-bold text-center">Specializations</h2>
      <hr className="my-6 border-gray-600" />
      
      <div className="flex flex-wrap justify-center gap-3">
        {profile?.skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full text-base font-medium hover:bg-gray-600 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )}
    {/* Experience */}
    {profile?.experience?.length && (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-white mt-4">
      <h2 className="text-2xl font-bold text-center">Filmography & Experience</h2>
      <hr className="my-6 border-gray-600" />

      {/* Container for the list of experiences */}
      <div className="space-y-0">
        {profile?.experience?.map((exp,index) => (
          
          <div key={index} className="flex gap-4 sm:gap-6">
            
           
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
              <p className="text-sm text-gray-400 mt-1">{exp.duration}</p>
              <p className="text-base text-gray-300 mt-1 leading-relaxed">
                {exp.description}
              </p>
              <hr className="my-6 border-gray-600" />
            </div>

          </div>
        ))}
      </div>
    </div>)}

    {/* Education */}
    {profile?.education?.length && (
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-white mt-4">
      <h2 className="text-2xl font-bold text-center">Education & Training</h2>
      <hr className="my-6 border-gray-600" />
      <div className="space-y-0">
        {profile?.education.map((edu,index) => (
          
          <div key={index} className="flex gap-4 sm:gap-6">
            
           
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white">{edu.course}</h3>
              <p className="text-sm text-gray-400 mt-1"> {edu.institute}&nbsp;&nbsp;&nbsp;{edu.duration}</p>
              <p className="text-base text-gray-300 mt-1 leading-relaxed">
                {edu.description}
              </p>
              <hr className="my-6 border-gray-600" />
            </div>

          </div>
        ))}
      </div>
    </div>)}

    {/* Portfoilo */}

    {/* Contact */}
    {profile?.email || profile?.phone && (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-white mt-4">
      <h2 className="text-2xl font-bold text-center">Contact for Collaborations</h2>
      <hr className="my-6 border-gray-600" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4 text-gray-300" />
              <span className="text-gray-200">{profile.email}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="w-4 h-4 text-gray-300" />
              <span className="text-gray-200">{profile.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

  </div>
</div>

  );


};

export default SpecficUserProfile;