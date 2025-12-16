import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// 지원하는 데이터 타입들
const VALID_TYPES = ["activities", "projects", "experience", "skills", "certifications"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;

    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: "Invalid data type" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "src", "data", `${type}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return NextResponse.json(
      { error: "Failed to load data" },
      { status: 500 }
    );
  }
}



