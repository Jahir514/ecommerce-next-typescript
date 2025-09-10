
/**
 * Sidenav component
 * Displays categories and subcategories, handles selection and expansion.
 * Migrated from legacy Sidebar.jsx to Next.js/TypeScript, with clear documentation and comments.
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpandedCategory } from "@/features/common/sidenav/sidenavSlice";
import {
	Heart,
	Sun,
	Zap,
	UtensilsCrossed,
	Sparkles,
	User,
	Activity,
	Baby,
	Home,
	FileText,
	PawPrint,
	Gamepad2,
	Palette,
	Shirt,
	Car,
	Shield,
	Star,
	BookOpen,
	ChevronRight,
	ChevronDown,
} from "lucide-react";
// import { getImageUrl } from "@/utils/api"; // Uncomment if you have this util

interface SidenavProps {
	isOpen: boolean;
	activeCategory: string | null;
	activeSubCategory: string | null;
	onCategorySelect: (categoryId: string) => void;
	onSubCategorySelect: (subCategory: string) => void;
	onReset: () => void;
}

const Sidenav: React.FC<SidenavProps> = ({ isOpen, activeCategory, activeSubCategory, onCategorySelect, onSubCategorySelect, onReset }) => {
	const dispatch = useDispatch();
	// Replace with your navigation logic if needed
	// const navigate = useNavigate();
	const { expandedCategory } = useSelector((state: any) => state.sidenav);
	const { productCategoryData } = useSelector((state: any) => state.categories.productCategoryData);

	// Map for icon components
	const iconMap: Record<string, React.ElementType> = {
		Heart,
		Sun,
		Zap,
		UtensilsCrossed,
		Sparkles,
		User,
		Activity,
		Baby,
		Home,
		FileText,
		PawPrint,
		Gamepad2,
		Palette,
		Shirt,
		Car,
		Shield,
		Star,
		BookOpen,
	};

	/**
	 * Handle category click: expand/collapse or select
	 */
	const handleCategoryClick = (category: any) => {
		const categoryData = productCategoryData?.find((item: any) => item.category._id === category._id);
		const hasSubcategories = categoryData && categoryData.subcategory && categoryData.subcategory.length > 0;

		if (hasSubcategories) {
			dispatch(setExpandedCategory(expandedCategory === category._id ? null : category._id));
		} else {
			onCategorySelect(category._id);
			dispatch(setExpandedCategory(null));
			// Navigation logic can be added here
		}
	};

	/**
	 * Handle subcategory click: select and navigate
	 */
	const handleSubCategoryClick = (
		categoryId: string,
		categoryName: string,
		subCategory: string,
		subCategoryId: string,
		subCategoryName: string
	) => {
		onCategorySelect(categoryId);
		onSubCategorySelect(subCategory);
		// Navigation logic can be added here
		// Example:
		// const encodedCategory = encodeURIComponent(categoryName);
		// const encodedSubCategory = encodeURIComponent(subCategoryName);
		// navigate(`/products/list/search/?category=${encodedCategory}&subcategory=${encodedSubCategory}`);
	};

	// If not open, return null (optional)
	// if (!isOpen) return null;

	return (
		<div className="space-y-1">
			{productCategoryData &&
				productCategoryData.map((item: any, index: number) => {
					const category = item.category;
					const hasSubcategories = item.subcategory && item.subcategory.length > 0;

					// Get the icon from the icon map or default to Heart
					const IconComponent = category.icon ? iconMap[category.icon] || Heart : Heart;

					const isActive = activeCategory === category._id;
					const isExpanded = expandedCategory === category._id;

					return (
						<div key={category._id || index} className="select-none">
							{/* Main Category */}
							<div
								className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? `text-themeColor ` : "hover:bg-gray-100"}`}
								onClick={() => handleCategoryClick(category)}
							>
								<div className="flex items-center space-x-3 flex-1">
									{/* Category icon */}
									{/* Uncomment below if you use getImageUrl for custom icons */}
									{/* {category.icon ? (
										<img className={`w-5 h-5 ${isActive ? "text-themeColor" : category.color || "text-gray-500"}`} src={getImageUrl(category.icon)} alt="Category Icon" />
									) : ( */}
									<IconComponent className={`w-5 h-5 ${isActive ? "text-themeColor" : category.color || "text-gray-500"}`} />
									{/* )} */}
									<span className={`font-medium ${isActive ? "text-themeColor " : "textColorLight"}`}>{category.name}</span>
								</div>

								{hasSubcategories && (
									<div className="ml-2">
										{isExpanded ? (
											<ChevronDown className={`w-4 h-4 ${isActive ? "text-themeColor " : "text-textColorLight"}`} />
										) : (
											<ChevronRight className={`w-4 h-4 ${isActive ? "text-themeColor" : "text-textColorLight"}`} />
										)}
									</div>
								)}
							</div>

							{/* Subcategories */}
							{hasSubcategories && isExpanded && (
								<div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-100">
									{item.subcategory.map((subCategory: any, subIndex: number) => {
										// Handle both object and string subcategories
										const subCategoryName = typeof subCategory === "object" ? subCategory.name : subCategory;
										const subCategoryId = typeof subCategory === "object" ? subCategory._id : subIndex;

										const isSubActive = activeCategory === category._id && activeSubCategory === subCategoryName;

										return (
											<div
												key={subCategoryId}
												className={`p-2 pl-4 cursor-pointer transition-all duration-200 hover:shadow-sm ${
													isSubActive ? " text-themeColor" : "text-textColorLight hover:bg-gray-50 hover:text-textColorLight"
												}`}
												onClick={() => handleSubCategoryClick(category._id, category.name, subCategoryName, subCategoryId, subCategoryName)}
											>
												<span className="text-sm font-medium">{subCategoryName}</span>
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default Sidenav;
