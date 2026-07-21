import FuzzyText from "../../Components/ui/FuzzyText";

export default function NotFound() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center gap-y-3">
      <FuzzyText fontSize="10rem" fontWeight={900}>
        404
      </FuzzyText>
      <FuzzyText fontSize="2.5rem" fontWeight={900}>
        PAGE NOT FOUND
      </FuzzyText>
    </div>
  );
}