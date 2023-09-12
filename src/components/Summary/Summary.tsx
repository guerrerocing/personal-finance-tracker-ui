import { Card, CardFooter, Button } from "@nextui-org/react";

interface SummaryProps {
  incomes: string;
  expenses: string;
  balance: string;
  onClickAction: () => void;
}

const Summary = ({
  incomes,
  expenses,
  balance,
  onClickAction,
}: SummaryProps) => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      <Card shadow="sm">
        <CardFooter className="text-small justify-between">
          <b>Total Income</b>
          <p className="text-default-500 text-success">${incomes}</p>
        </CardFooter>
      </Card>
      <Card shadow="sm">
        <CardFooter className="text-small justify-between">
          <b>Total Expenses</b>
          <p className=" text-danger">${expenses}</p>
        </CardFooter>
      </Card>
      <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
        <CardFooter className="text-small justify-between">
          <b>Balance</b>
          <p className="text-default-500 text-primary">${balance}</p>
        </CardFooter>
      </Card>
      <Button color="primary" variant="bordered" onClick={onClickAction}>
        Add Transaction
      </Button>
    </div>
  );
};

export default Summary;
