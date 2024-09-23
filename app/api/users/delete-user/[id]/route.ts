import pool from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const [rows]: any[] = await pool.query("DELETE FROM User WHERE id = ?", [id]);
        // delte from UserInfo
        await pool.query("DELETE FROM UserInfo WHERE userId = ?", [id]);


        if (rows.affectedRows === 0) {
            return NextResponse.json({ message: "User not Deleted" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}