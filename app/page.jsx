"use client";

import PersonInput from "./components/PersonInput/PersonInput";
import SocialLinks from "./components/SocialLinks/SocialLinks";
import Header from "./components/Header/Header";
import Countdown from "./components/Countdown/Countdown";

import Plus from "./assets/plus.svg";
import Image from "next/image";

import { useState } from "react";
import jwt from "jwt-encode";
import Copyright from "./components/Copyright/Copyright";

export default function Home() {
  const [personData, setPersonData] = useState([]);
  const [numInputs, setNumInputs] = useState(1);
  const [people, setPeople] = useState([]);
  const [submitting, setSubmmiting] = useState(true);
  const [error, setError] = useState(false);
  const [url, setURL] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Παρουσιάστηκε κάποιο σφάλμα με τα στοιχεία,παρακαλώ προσπαθήστε ξανά αργότερα"
  );
  const [canSubmit, setCanSubmit] = useState(true);

  const targetDate = new Date("2023-05-21T07:00:00").getTime();

  const handleSubmit = async (e, people) => {
    setError(false);
    setSubmmiting(false);
    setCanSubmit(false);
    e.preventDefault();
    for (const person of personData) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        };

        const response = await fetch("/api/get-person-info", requestOptions);
        const result = await response.json();
        if (response.status == 200) {
          const data = result.data[0];
          if (data.latitude && data.longitude) {
            if (!people.some((person) => person.id === data.id)) {
              people.push(data);
            }
            setPeople(people);
            setErrorMessage("");
            setError(false);
          } else {
            setError(true);
            setErrorMessage(
              "Δυστυχώς τα στοιχεία που δημοσίευσες δεν παρέχουν γεωγραφικές πληροφορίες"
            );
          }
        }
        if (people.length > 0) {
          const urlElements = [];

          people.forEach((element) => {
            const lat = element.latitude;
            const long = element.longitude;
            const address = element.FinalSectionInfo;
            const surname = element.EponymoFull;
            const name = element.Onoma;
            const dhmot = element.dhmot;
            const pollingId = element.Eid_ekl_ar;
            const urlObject = {
              lat,
              long,
              address,
              surname,
              name,
              dhmot,
              pollingId,
            };

            const isDuplicate = urlElements.some(
              (obj) => obj.pollingId === pollingId
            );
            if (!isDuplicate) {
              urlElements.push(urlObject);
            }
          });
          const secret = "mathePouPsifizeis";
          const token = jwt(urlElements, secret);

          const urlWithToken = `/map?info=${token}`;
          setURL(urlWithToken);
        }

        // Process the result as needed
      } catch (error) {
        console.log("Error:", error);
      }
    }
    if (people.length == 0) {
      const ticks = document.getElementsByClassName("tick");
      if (ticks.length == 0) {
        setErrorMessage("Δεν υπάρχουν πρόσωπα για αναζήτηση");
      }
      setError(true);
      setCanSubmit(true);
      setSubmmiting(true);
    }
  };

  const addInput = () => {
    setNumInputs((prevNumInputs) => prevNumInputs + 1);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col align-items-center h-100 gap-6 py-12 bg-gradient-to-r from-cyan-200 to-blue-200">
        <Header />
        <Countdown targetDate={targetDate} />
        {[...Array(numInputs)].map((_, index) => {
          return (
            <PersonInput
              data={personData}
              key={index}
              setPersonData={setPersonData}
            />
          );
        })}
        {submitting ? (
          <>
            <button
              id="addInput"
              className="max-w-[60px] w-full mx-auto"
              onClick={addInput}
            >
              <Image src={Plus} alt="plus" />
            </button>
          </>
        ) : null}
        {canSubmit ? (
          <>
            <button
              id="handleSubmit"
              onClick={(event) => handleSubmit(event, people)}
              className="bg-sky-500 text-white rounded-md p-3 w-full max-w-[150px] mx-auto"
            >
              Ολοκλήρωση
            </button>
          </>
        ) : null}
        {error ? (
          <>
            <div className="container text-center w-full mx-auto text">
              {errorMessage}
            </div>
          </>
        ) : null}
        {url ? (
          <>
            <div className="container text-center w-full mx-auto text">
              <SocialLinks url={url} />
            </div>
          </>
        ) : null}
      </main>
      <footer>
        <Copyright />
      </footer>
    </>
  );
}
