import { createClient } from "@supabase/supabase-js";
const URL = "https://ksxdpjvbvfybrhxsxmil.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzeGRwanZidmZ5YnJoeHN4bWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNjc1NjAsImV4cCI6MjAwNzY0MzU2MH0.lWHl_U_ctrqw-Pk-2C4iRiwjU2CGVpWAmt_mDvz0Aks";

export const supabase = createClient(URL, API_KEY);
