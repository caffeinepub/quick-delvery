import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    latitude: number;
    longitude: number;
}
export interface Product {
    id: bigint;
    categoryId: ProductCategoryId;
    coreIcon?: CoreIcon;
    name: string;
    discounts: Discounts;
    description: string;
    stock: bigint;
    imageUrl: string;
    price: bigint;
    location: Location;
}
export interface Discounts {
    originalPrice: bigint;
    discountPercentage: number;
    discountedPrice: bigint;
}
export interface UserProfile {
    name: string;
    email?: string;
    phone?: string;
    location?: Location;
}
export enum CoreIcon {
    Car = "Car",
    Basket = "Basket",
    House = "House"
}
export enum ProductCategoryId {
    Groceries = "Groceries",
    Beverages = "Beverages",
    Dairy = "Dairy",
    Bakery = "Bakery",
    Vegetables = "Vegetables",
    Snacks = "Snacks",
    Fruits = "Fruits"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addLocation(lat: number, long: number): Promise<void>;
    addProduct(id: bigint, name: string, desc: string, price: bigint, stock: bigint, imageUrl: string, origPrice: bigint, discPrice: bigint, discPerc: number, icon: CoreIcon | null, lat: number, long: number, categoryId: ProductCategoryId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getCallerLocation(): Promise<Location | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProductById(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(categoryId: ProductCategoryId): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isServiceAvailable(lat: number, long: number): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProduct(id: bigint, name: string, desc: string, price: bigint, stock: bigint, imageUrl: string, origPrice: bigint, discPrice: bigint, discPerc: number, icon: CoreIcon | null, lat: number, long: number, categoryId: ProductCategoryId): Promise<void>;
}
