import Button from "./Button";

export default function VoteCard({ onVoteA, onVoteB }) {
  return (
    <div className="flex flex-col gap-8 items-center fade-in">
      <Button label="Vote for Option A" onClick={onVoteA} />
      <Button label="Vote for Option B" onClick={onVoteB} />
    </div>
  );
}
