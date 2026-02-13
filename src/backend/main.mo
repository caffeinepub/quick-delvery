import Int "mo:core/Int";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // Constants and types
  module CoreIcon {
    public type CoreIcon = { #Basket; #Car; #House };
  };

  type ProductCategoryId = {
    #Groceries;
    #Fruits;
    #Vegetables;
    #Dairy;
    #Snacks;
    #Bakery;
    #Beverages;
  };

  type Discounts = {
    originalPrice : Nat;
    discountedPrice : Nat;
    discountPercentage : Float;
  };

  type Location = {
    latitude : Float;
    longitude : Float;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    stock : Nat;
    imageUrl : Text;
    discounts : Discounts;
    coreIcon : ?CoreIcon.CoreIcon;
    location : Location;
    categoryId : ProductCategoryId;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  public type UserProfile = {
    name : Text;
    email : ?Text;
    phone : ?Text;
    location : ?Location;
  };

  // State Variables
  let products = Map.empty<Nat, Product>();
  let locations = Map.empty<Principal, Location>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Functions (Required by instructions)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Location Management (User-only)
  public shared ({ caller }) func addLocation(lat : Float, long : Float) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save locations");
    };
    locations.add(caller, { latitude = lat; longitude = long });
  };

  public query ({ caller }) func getCallerLocation() : async ?Location {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their location");
    };
    locations.get(caller);
  };

  // Product Management (Admin-only)
  public shared ({ caller }) func addProduct(id : Nat, name : Text, desc : Text, price : Nat, stock : Nat, imageUrl : Text, origPrice : Nat, discPrice : Nat, discPerc : Float, icon : ?CoreIcon.CoreIcon, lat : Float, long : Float, categoryId : ProductCategoryId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      id;
      name;
      description = desc;
      price;
      stock;
      imageUrl;
      discounts = {
        originalPrice = origPrice;
        discountedPrice = discPrice;
        discountPercentage = discPerc;
      };
      coreIcon = icon;
      location = { latitude = lat; longitude = long };
      categoryId;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, desc : Text, price : Nat, stock : Nat, imageUrl : Text, origPrice : Nat, discPrice : Nat, discPerc : Float, icon : ?CoreIcon.CoreIcon, lat : Float, long : Float, categoryId : ProductCategoryId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    let product : Product = {
      id;
      name;
      description = desc;
      price;
      stock;
      imageUrl;
      discounts = {
        originalPrice = origPrice;
        discountedPrice = discPrice;
        discountPercentage = discPerc;
      };
      coreIcon = icon;
      location = { latitude = lat; longitude = long };
      categoryId;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  // Public Product Queries (Available to all including guests)
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductById(id : Nat) : async ?Product {
    products.get(id);
  };

  public query ({ caller }) func getProductsByCategory(categoryId : ProductCategoryId) : async [Product] {
    let filtered = products.values().toArray().filter(func(p) { p.categoryId == categoryId });
    filtered;
  };

  // Service Availability Check (Public - available to all)
  public query ({ caller }) func isServiceAvailable(lat : Float, long : Float) : async Bool {
    let storeLat : Float = 48.8566; // Paris coordinates (replace with actual store location)
    let storeLong : Float = 2.3522;
    let earthRadiusKm : Float = 6371;
    let latRad : Float = lat * 3.14159265359 / 180;
    let storeLatRad : Float = storeLat * 3.14159265359 / 180;
    let deltaLat : Float = (storeLat - lat) * 3.14159265359 / 180;
    let deltaLong : Float = (storeLong - long) * 3.14159265359 / 180;
    let a : Float = Float.sin(deltaLat / 2) ** 2 + Float.cos(latRad) * Float.cos(storeLatRad) * Float.sin(deltaLong / 2) ** 2;
    let c : Float = 2 * Float.arctan2(Float.sqrt(a), Float.sqrt(1 - a));
    let distanceKm : Float = earthRadiusKm * c;
    distanceKm <= 15.0;
  };
};
