import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

// Custom auth functions
export const customAuth = {
  // Sign up with username and password
  async signUp(username, password) {
    try {
      // Check if username exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("username")
        .eq("username", username)
        .maybeSingle();

      if (existingUser) {
        throw new Error("Username already taken");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Create user in our custom users table
      const { data: user, error: userError } = await supabase
        .from("users")
        .insert({
          username,
          password_hash,
        })
        .select()
        .single();

      if (userError) throw userError;

      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        username,
        photos: [],
        interests: [],
      });

      if (profileError) throw profileError;

      // Store user in localStorage (our session)
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          username: user.username,
        }),
      );

      return { user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },

  // Sign in with username and password
  async signIn(username, password) {
    try {
      // Get user from database
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (error) throw error;
      if (!user) throw new Error("Username not found");

      // Compare passwords
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) throw new Error("Invalid password");

      // Store user in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          username: user.username,
        }),
      );

      return { user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },

  // Sign out
  signOut() {
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("user");
  },
};
