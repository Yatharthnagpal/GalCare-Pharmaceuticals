import { NextResponse } from "next/server"
import { updateWPJob, deleteWPJob } from "@/lib/wordpress"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const result = await updateWPJob(id, body)

    return NextResponse.json({
      success: true,
      message: result.success ? "Job updated in WordPress CMS." : "Job updated locally.",
    })
  } catch (error) {
    const { id } = await params
    console.error(`Error updating job ${id}:`, error)
    return NextResponse.json(
      { error: "Internal server error updating job opening." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await deleteWPJob(id)

    return NextResponse.json({
      success: true,
      message: result.success ? "Job deleted from WordPress CMS." : "Job removed locally.",
    })
  } catch (error) {
    const { id } = await params
    console.error(`Error deleting job ${id}:`, error)
    return NextResponse.json(
      { error: "Internal server error deleting job opening." },
      { status: 500 }
    )
  }
}
