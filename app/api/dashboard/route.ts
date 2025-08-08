import { NextResponse } from "next/server";
import { sampleTransactions } from "@/data/transactionData";
import { DashboardSummary } from "@/@types";
export async function GET() {
  try {
    const totalCredits = sampleTransactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalDebits = Math.abs(
      sampleTransactions
        .filter((t) => t.type === "debit")
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const totalBalance = totalCredits - totalDebits;
    const transactionCount = sampleTransactions.length;
    const balanceChange = 5.2;
    const creditsChange = 3.1; 
    const debitsChange = -2.3; 
    const transactionChange = 10.5; 

    const summary: DashboardSummary = {
      totalBalance,
      totalCredits,
      totalDebits,
      transactionCount,
      balanceChange,
      creditsChange,
      debitsChange,
      transactionChange,
    };

    return NextResponse.json({
      success: true,
      message: "Dashboard summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
} 