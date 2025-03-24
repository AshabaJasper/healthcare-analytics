import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { refreshProjectAllowedAmountTable } from "~/services/projectAllowedAmountService.server";

/**
 * API route to trigger a refresh of the ProjectAllowedAmount table
 * Can be called with a POST request to /api/refresh-project-allowed-amount
 */
export async function action({ request }: ActionFunctionArgs) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }
  
  try {
    const result = await refreshProjectAllowedAmountTable();
    return json(result);
  } catch (error) {
    console.error("Error refreshing ProjectAllowedAmount table:", error);
    return json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }, 
      { status: 500 }
    );
  }
}