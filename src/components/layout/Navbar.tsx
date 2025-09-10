"use client";
// Navbar component migrated from ref_frontend
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidenav } from "@/features/common/sidenav/sidenavSlice";
import SearchBar from "./navbar/SearchBar";
import Location from "./navbar/location/Location";
import Image from "next/image";
import Cart from "../common/Cart";
import { UserCircle, User, LogOut, List, Search } from "lucide-react";

const Navbar: React.FC = () => {
	const dispatch = useDispatch();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const sidebarOpen = useSelector((state: any) => state.location);
	console.log(sidebarOpen);
	// Example logo path from public folder
	const logo = "/assets/images/logo-beta.png";
	const profile_image = "/assets/images/fox.jpg";

	/**
	 * Handle logo click (implement navigation if needed)
	 */
	const handleLogoClick = () => {
		// ...existing code...
	};

	/**
	 * Handle All Categories button click
	 * Dispatches toggleSidenav action to open/close sidebar
	 * Follows code/documentation style of Location.tsx
	 */
	const handleAllCategoriesClick = () => {
		dispatch(toggleSidenav());
	};

	/**
	 * Handle sign out (implement logic if needed)
	 */
	const handleSignOut = () => {
		// ...existing code...
	};

	return (
		<div>
			<div className="bg-sectionBackgroundLight">
				<div className="header-bottom z-50 px-4 py-0">
					<div className="flex items-center justify-between lg:gap-5 py-2">
						<div className="header-left flex items-center w-1/5">
							<div className="header-bottom-col logo flex justify-start w-[100px] 2md:logo-[185px] lg:w-[200px] ">
								<div className="logo-inner w-[85px] ml-0 2md:mx-auto 2md:w-[130px]">
									{/* Use <Image /> for Next.js or <img /> for static assets */}
									<Image
										onClick={handleLogoClick}
										src={logo}
										alt="Amana Big Bazar"
										className="img-fluid cursor-pointer"
										width={130}
										height={40}
									/>
								</div>
							</div>
						</div>
						<div className="w-2/5">
							<SearchBar />
						</div>
						<div className="w-2/5 flex items-center text-right justify-end gap-5 header-bottom-col">
							<Cart />
							<Location />
							<div className="profile-button min-w-[35px] 2md:min-w[65px]">
								<div className="signin-dropdown">
									<div className="dropdown relative">
										<button
											className="profile-dropdown-btn flex items-center"
											onClick={() => setDropdownOpen(!dropdownOpen)}
										>
											{/* TODO: Add authentication logic */}
											<div className="flex justify-end gap-1 items-center text-font-17 text-themeColor ">
												<UserCircle className="mr-1 w-5 h-5" /> Login
											</div>
										</button>
										{/* Dropdown Menu */}
										{dropdownOpen && (
											<div className="dropdown-menu absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 rounded shadow-lg z-10">
												<a
													href="#"
													className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] "
												>
													<User className="text-font-14 hover:text-themeColor mr-1 w-4 h-4" /> My Profile
												</a>
												{/* Add more dropdown items as needed */}
												<a
													href="#"
													className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] border-t border-t-[#e9ecef]"
													onClick={handleSignOut}
												>
													<LogOut className="text-font-14 hover:text-themeColor mr-1 w-4 h-4" /> Sign Out
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Smaller to Mid Devices Search */}
				<div className="header-sm flex items-center mt-1 mb-0 mx-3 lg:hidden">
					<button type="button" className="btn btn-default btn-category-all d-sm-none mr-3">
						<List className="w-5 h-5" />
					</button>
					<div className="header-bottom-mid bg-white rounded shadow-sm px-2 flex-fill">
						<form className="flex">
							<div className="form-group mb-0 header-select mr-2 mr-lg-3 d-none sm:block">
								<select className="form-control">
									<option disabled>All Categories</option>
									<option>Category 1</option>
									<option>Category 2</option>
								</select>
							</div>
							<div className="form-group mb-0 flex-fill ml-0 ml-sm-3">
								<div className="input-group cus-input-field">
									<input
										type="text"
										className="form-control border-0"
										placeholder="Search for products..."
									/>
									<div className="input-group-append">
										<button type="button" className="input-group-text">
											<Search className="mr-2 w-4 h-4 text-success" /> Search
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="bg-themeColor">
				<div className="bg-theme px-5 py-1.5 flex justify-between items-center">
					<div className="all-categories-btn">
						<button
							type="button"
							className="btn text-font-16 tracking-[1px] text-uppercase text-[#F8FAFC] btn-block flex items-center justify-between font-weight-bold transition-colors"
							onClick={handleAllCategoriesClick}
						>
							All Categories <List className="pl-2 w-7 h-7 font-bold" />
						</button>
					</div>
					<div
						className="bg-themeColor h-[36px] flex justify-between p-0 border-[3px] border-sectionBackground rounded-[14px] cursor-pointer align-middle items-center font-times shadow-[0px_0px_5px_0px_#41b883]"
						// onClick={() => goProductList()}
					>
						<button className="offer-btn bg-sectionBackground font-bold border-0 py-[6px] px-[8px] rounded-[10px] text-themeColor text-font-14 tracking-[1px]">
							OFFERS
						</button>
						<p className="offer-text px-[6px] text-[20px] font-bold text-[#F8FAFC] leading-[1.3] self-center">
							{" "}
							{/* specialOfferCount */} +
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
