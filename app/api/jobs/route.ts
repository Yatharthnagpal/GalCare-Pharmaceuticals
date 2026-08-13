import { NextResponse } from "next/server"
import { fetchWPJobs, createWPJob } from "@/lib/wordpress"
import { JOBS } from "@/lib/site-data"

export async function GET() {
  try {
    const wpJobs = await fetchWPJobs()
    if (wpJobs && wpJobs.length > 0) {
      return NextResponse.json({ success: true, jobs: wpJobs })
    }
    return NextResponse.json({ success: true, jobs: JOBS })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ success: true, jobs: JOBS })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, department, location, type, experience, description } = body

    if (!title || !department) {
      return NextResponse.json(
        { error: "Job title and department are required fields." },
        { status: 400 }
      )
    }

    const jobData = {
      title,
      department,
      location: location || "Jaipur, Rajasthan",
      type: type || "Full-time",
      experience: experience || "2-5 Years",
      description: description || "",
    }

    const result = await createWPJob(jobData)

    return NextResponse.json({
      success: true,
      id: result.id || `job-${Date.now()}`,
      job: { ...jobData, id: result.id || `job-${Date.now()}` },
      message: "Job opening created successfully.",
    })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json(
      { error: "Internal server error creating job opening." },
      { status: 500 }
    )
  }
}
