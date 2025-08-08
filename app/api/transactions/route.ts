import { NextRequest, NextResponse } from "next/server";
import { sampleTransactions } from "@/data/transactionData";
import { Transaction } from "@/@types";
type Key = string | number;
function filterTransactions(
  transactions: Transaction[],
  filters: {
    type?: "credit" | "debit" | "all";
    search?: string;
  }
) {
  let filtered = [...transactions];

  if (filters.type && filters.type !== "all") {
    filtered = filtered.filter((t) => t.type === filters.type);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    console.log("Searching for:", searchTerm);
    filtered = filtered.filter(
      (t) =>
        t.remark.toLowerCase().includes(searchTerm) ||
        t.currency.toLowerCase().includes(searchTerm) ||
        t.type.toLowerCase().includes(searchTerm)
    );
    console.log("Filtered results:", filtered.length);
  }

  return filtered;
}

function sortTransactions(
  transactions: Transaction[],
  sortBy: string = "date",
  sortOrder: "asc" | "desc" = "desc"
) {
  return [...transactions].sort((a, b) => {
    let aValue: Key = a[sortBy as keyof Transaction];
    let bValue: Key = b[sortBy as keyof Transaction];
    if (sortBy === "date") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    if (sortBy === "amount") {
      aValue = Math.abs(aValue as number);
      bValue = Math.abs(bValue as number);
    }
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

function paginateTransactions(
  transactions: Transaction[],
  page: number = 1,
  limit: number = 10
) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = transactions.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: transactions.length,
      totalPages: Math.ceil(transactions.length / limit),
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type") as "credit" | "debit" | "all" | null;
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "date";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    console.log("API received search:", search);
    console.log("API received type:", type);

    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid pagination parameters",
        },
        { status: 400 }
      );
    }

    let filteredTransactions = filterTransactions(sampleTransactions, {
      type: type || "all",
      search,
    });

    filteredTransactions = sortTransactions(
      filteredTransactions,
      sortBy,
      sortOrder
    );

    const result = paginateTransactions(filteredTransactions, page, limit);

    console.log("API returning:", result.data.length, "transactions");

    return NextResponse.json({
      success: true,
      message: "Transactions retrieved successfully",
      ...result,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { date, remark, amount, currency, type } = body;

    if (!date || !remark || amount === undefined || !currency || !type) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    if (typeof amount !== "number") {
      return NextResponse.json(
        {
          success: false,
          message: "Amount must be a number",
        },
        { status: 400 }
      );
    }
    if (!["credit", "debit"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Type must be 'credit' or 'debit'",
        },
        { status: 400 }
      );
    }
    const newTransaction: Transaction = {
      id: (sampleTransactions.length + 1).toString(),
      date,
      remark,
      amount,
      currency,
      type,
    };
    sampleTransactions.push(newTransaction);
    return NextResponse.json(
      {
        success: true,
        message: "Transaction created successfully",
        data: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
