import { NextRequest, NextResponse } from "next/server";
import { sampleTransactions } from "@/data/transactionData";

// GET one transaction
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const transaction = sampleTransactions.find((t) => t.id === id);

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Transaction retrieved successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// UPDATE a transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const transactionIndex = sampleTransactions.findIndex((t) => t.id === id);
    if (transactionIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    const { amount, type } = body;

    if (amount !== undefined && typeof amount !== "number") {
      return NextResponse.json(
        { success: false, message: "Amount must be a number" },
        { status: 400 }
      );
    }

    if (type && !["credit", "debit"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Type must be 'credit' or 'debit'" },
        { status: 400 }
      );
    }

    const updatedTransaction = {
      ...sampleTransactions[transactionIndex],
      ...body,
    };

    sampleTransactions[transactionIndex] = updatedTransaction;

    return NextResponse.json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE a transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const transactionIndex = sampleTransactions.findIndex((t) => t.id === id);

    if (transactionIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    sampleTransactions.splice(transactionIndex, 1);

    return NextResponse.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
