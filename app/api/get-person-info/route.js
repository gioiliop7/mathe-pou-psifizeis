import { NextResponse } from "next/server";
import { removeAccents } from "@/app/utils/helpers";
import { validateGreekText } from "@/app/utils/validations";

export async function POST(req) {
  // Handle the POST request here
  const body = await req.json();
  const { firstName, lastName, fatherName, motherName, birthYear } = body;

  let birthYearValue = birthYear;
  if (typeof birthYear == "number") {
    birthYearValue = birthYear.toString();
  }

  // Check if any inputs are empty
  if (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    fatherName.trim() === "" ||
    motherName.trim() === "" ||
    birthYearValue.trim() === ""
  ) {
    return NextResponse.json(
      { message: "Empty input fields", data: [] },
      { status: 400 }
    );
  }

  // Validate the Greek text inputs
  if (
    !validateGreekText(firstName) ||
    !validateGreekText(lastName) ||
    !validateGreekText(fatherName) ||
    !validateGreekText(motherName)
  ) {
    return NextResponse.json(
      { message: "Invalid input fields", data: [] },
      { status: 400 }
    );
  }

  // Validate the birth year input
  if (isNaN(birthYear)) {
    return NextResponse.json(
      { message: "Birth year must be a number", data: [] },
      { status: 400 }
    );
  }

  const ypesBody = {
    name: removeAccents(firstName),
    lastName: removeAccents(lastName),
    nameOfFather: removeAccents(fatherName),
    nameOfMother: removeAccents(motherName),
    birthYear: birthYearValue,
  };

  const requestHeaders = {
    authority: "mpp.ypes.gov.gr",
    accept: "application/json, text/plain, */*",
    "accept-language": "el-GR,el;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    cookie:
      "_ga=GA1.1.1410460489.1684661436; _ga_VSRGZ6DPPC=GS1.1.1684677278.3.0.1684677297.0.0.0",
    origin: "https://mpp.ypes.gov.gr",
    pragma: "no-cache",
    referer: "https://mpp.ypes.gov.gr/",
    "sec-ch-ua":
      '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
  };

  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(ypesBody),
  };

  try {
    // const response = await fetch(
    //   "https://mpp.ypes.gov.gr/back/api/index",
    //   requestOptions
    // );

    const result = await response.json();
    if (Object.keys(result).length === 0) {
      return NextResponse.json(
        { message: "Data not found", data: result },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "Success", data: result },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("error", error);
  }

  // Continue processing or return a success response
  return NextResponse.json(
    { message: "Something bad happened", data: [] },
    { status: 502 }
  );
}
