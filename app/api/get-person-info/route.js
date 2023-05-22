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
    "Content-Type": "application/json",
    Referer: "https://mpp.ypes.gov.gr/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    authority: "mpp.ypes.gov.gr",
    method: "POST",
    path: "/back/api/index",
    scheme: "https",
    origin: "Origin",
  };

  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(ypesBody),
  };

  try {
    const response = await fetch("https://mpp.ypes.gov.gr/back/api/index", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "el-GR,el;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
      referrer: "https://mpp.ypes.gov.gr/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"eeaCode":"","name":"ΓΕΩΡΓΙΟΣ","lastName":"ΗΛΙΟΠΟΥΛΟΣ","nameOfFather":"ΝΕΚΤ","nameOfMother":"ΠΑΝ","birthYear":"1997"}',
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
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
