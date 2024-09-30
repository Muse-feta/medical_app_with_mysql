import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignCenter, CircleUser } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";



type Props = {}

const MobileNav = (props: Props) => {
    const { isLogedIn, isAdmin, userData } = useAuth();
    console.log("isLogedIn", isLogedIn);
    const handleLogout = async () => {
      await axios.get("/api/users/logout");
       toast.success("Logout successfully");
      window.location.reload();
    };
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="mt-[20px]">
          <AlignCenter />
        </SheetTrigger>
        <SheetContent className="mt-[20px]">
          <SheetHeader>
            <SheetTitle className="mt-[20px]">
              {isLogedIn && <p> Wellcome: {userData?.firstName}</p>}
            </SheetTitle>
            <SheetDescription>
              Ethio Medical Clinic is dedicated to providing high-quality
              healthcare with great attention and care
            </SheetDescription>
          </SheetHeader>
          <nav className="mt-20">
            <ul className="list-none gap-5 text-black">
              <li className="mb-2 border-b border-gray-300 py-2">
                <Link href="/">Home</Link>
              </li>
              <li className="mt-2 border-b border-gray-300 py-2">
                <Link href="/about">About Us</Link>
              </li>
              <li className="mt-2 border-b border-gray-300 py-2">
                <Link href="/appointment">Appointment</Link>
              </li>
              <li className="mt-2 border-b border-gray-300 py-2">
                <Link href="/contact">Contact</Link>
              </li>
              {isAdmin && (
                <li className="mt-2 border-b border-gray-300 py-2">
                  <Link href="/admin/dashboard">Admin</Link>
                </li>
              )}
              <li className="mt-2 border-b border-gray-300 py-2">
                {isLogedIn ? (
                  <a className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </a>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </li>
              <li className="mt-2 border-b border-gray-300 py-2">
                {isLogedIn ? (
                  <Link href="/dashboard">View Appointments</Link>
                ) : null}
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
      <Toaster position="top-left" richColors />
    </div>
  );
}

export default MobileNav