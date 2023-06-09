import Link from "next/link";
import Image from "next/image";
import ypes from "../../assets/ypes-logo-el.png";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center py-4 bg-blue-100 text-blue-900 border-t-blue-900 border-2">
      <p className="text-sm font-bold">Developed by Giorgos Iliopoulos</p>
      <p className="text-xs">&copy; {currentYear} All rights reserved.</p>
      <p className="text-xs">
        Η εφαρμογή δεν αποθηκεύει κανένα προσωπικό δεδομένο των χρηστών και τα
        αποτελέσματα επεξεργάζονται μέσω διασύνδεσης με το API του υπουργείου
      </p>
      <p className="text-xs">
        Τα assets που χρησημοποιήθηκαν είναι απο πηγές του διαδικτύου και δεν
        αποτελούν προσωπική κτήση. Κάθε δικαιώμα ανήκει στους δημιουργούς των γραφικών.
      </p>
      <p className="mt-2">
        Data from{" "}
        <Link href="https://www.gov.gr">
          <Image
            src={"https://www.gov.gr/gov_gr_logo.svg"}
            alt="ypes logo"
            className="inline-block h-6 mx-1"
            width={100}
            height={300}
          />
        </Link>
        and{" "}
        <Link href="https://www.ypes.gr">
          <Image
            src={ypes}
            alt="ypes logo"
            className="inline-block h-8 mx-1 object-contain	"
            width={100}
            height={100}
          />
        </Link>
      </p>
    </div>
  );
};

export default Copyright;
