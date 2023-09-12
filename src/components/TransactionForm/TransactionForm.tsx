import { Input, Select, SelectItem } from "@nextui-org/react";

interface TransactionFormProps {
  amount?: string | number;
  description?: string | undefined;
  selected?: string;
  onTransactionFormChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const TransactionForm = ({
  amount,
  description,
  selected,
  onTransactionFormChange,
}: TransactionFormProps) => {
  const transactionTypes = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];
  return (
    <form className="flex flex-col gap-4 h-[300px]">
      <Select
        items={transactionTypes}
        label="Transaction Type"
        placeholder="Select a type"
        selectedKeys={selected ? [selected] : []}
        name="type"
        id="type"
        onChange={onTransactionFormChange}
      >
        {(type) => <SelectItem key={type.value}>{type.label}</SelectItem>}
      </Select>
      <Input
        isRequired
        label="Amount"
        placeholder="Enter Amount"
        type="text"
        id="amount"
        name="amount"
        value={amount}
        onChange={onTransactionFormChange}
      />
      <Input
        isRequired
        label="Description"
        placeholder="Enter your description"
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={onTransactionFormChange}
      />
    </form>
  );
};

export default TransactionForm;
