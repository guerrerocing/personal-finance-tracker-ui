import { useState, useEffect, useCallback } from "react";
import {
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTrendUp,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";

import IconWrapper from "../../components/IconWrapper";
import NavBar from "../../components/NavBar";
import AmountItem from "../../components/AmountItem";
import Summary from "../../components/Summary";
import SummarySkeleton from "../../components/SummarySkeleton";
import TransactionForm from "../../components/TransactionForm";
import transactionService from "../../services/transactionService";

interface SummaryResponse {
  totalIncome: string;
  totalExpenses: string;
  balance: string;
}
interface Transaction {
  id?: string;
  description: string;
  amount: string | number;
  type: string;
  date?: string;
}

const Dashboard = () => {
  //const openTransactionModal = () => {};
  const [transaction, setTransaction] = useState<Transaction>({
    description: "",
    amount: 0,
    type: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //Get Summary
  const loadSummary = useCallback(async () => {
    try {
      const response = await transactionService.getSummary();

      setSummary(response);
    } catch (error) {
      console.error(error);
    }
  }, []);
  //Get Transaction list
  const loadTransactions = useCallback(async () => {
    try {
      const response = await transactionService.getTransactions();
      setTransactions(response.transactions);
    } catch (error) {
      console.error(error);
    }
  }, []);

  function incomeTransaction(): Transaction[] {
    return transactions.filter((t) => t.type == "income");
  }

  function expensesTransaction(): Transaction[] {
    return transactions.filter((t) => t.type == "expense");
  }

  useEffect(() => {
    loadSummary();
    loadTransactions();
  }, []);

  const handleRegisterFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTransaction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (id: string, transactionData: Transaction) => {
    setTransaction(transactionData);
    setEditMode(true);

    onOpen();
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      await transactionService.deleteTransaction(id);
      loadTransactions();
      loadSummary();
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setTransaction({
      id: "",
      description: "",
      amount: "",
      type: "",
      date: "",
    });
  };

  const handleSubmit = async () => {
    if (editMode) {
      try {
        await transactionService.editTransaction(transaction);
        setEditMode(false);
        loadTransactions();
        loadSummary();
        clearForm();
        onClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await transactionService.createTransaction(transaction);
        loadTransactions();
        loadSummary();
        clearForm();
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="w-full">
      <NavBar />
      <div className="container mx-auto py-4">
        {summary ? (
          <Summary
            incomes={summary.totalIncome}
            expenses={summary.totalExpenses}
            balance={summary.balance}
            onClickAction={onOpen}
          />
        ) : (
          <SummarySkeleton />
        )}

        <div className="flex w-full flex-col">
          <Tabs
            fullWidth
            aria-label="Options"
            color="primary"
            variant="bordered"
            className="mt-4"
          >
            <Tab
              key="all"
              title={
                <div className="flex items-center space-x-2">
                  <span>All Transactions</span>
                </div>
              }
            >
              <Listbox
                aria-label="User Menu"
                className="full-w px-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1  overflow-visible shadow-small rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
              >
                {transactions.length ? (
                  transactions.map((transaction) => (
                    <ListboxItem
                      key={transaction.date ?? ""}
                      endContent={
                        <AmountItem
                          amount={
                            transaction.type == "income"
                              ? `+$${transaction.amount}`
                              : `-$${transaction.amount}`
                          }
                          onDelete={() => {
                            handleDelete(transaction.id);
                          }}
                          onEdit={() => {
                            handleEdit(transaction.id!, transaction);
                          }}
                        />
                      }
                      startContent={
                        <IconWrapper
                          className={
                            transaction.type == "income"
                              ? "bg-success/10 text-success"
                              : "bg-danger/10 text-danger"
                          }
                        >
                          <FontAwesomeIcon
                            className="text-lg "
                            icon={
                              transaction.type == "income"
                                ? faMoneyBillTrendUp
                                : faFileInvoiceDollar
                            }
                          />
                        </IconWrapper>
                      }
                    >
                      {transaction.description}
                    </ListboxItem>
                  ))
                ) : (
                  <ListboxItem key="no-records">
                    {` There's no transactions to show you`}
                  </ListboxItem>
                )}
              </Listbox>
            </Tab>
            <Tab
              key="incomes"
              title={
                <div className="flex items-center space-x-2">
                  <span>Incomes</span>
                </div>
              }
            >
              <Listbox
                aria-label="User Menu"
                className="full-w px-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1  overflow-visible shadow-small rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
              >
                {incomeTransaction().length ? (
                  incomeTransaction().map((transaction) => (
                    <ListboxItem
                      key={transaction.date ?? ""}
                      endContent={
                        <AmountItem
                          amount={
                            transaction.type == "income"
                              ? `+$${transaction.amount}`
                              : `-$${transaction.amount}`
                          }
                          onDelete={() => {
                            handleDelete(transaction.id);
                          }}
                          onEdit={() => {
                            handleEdit(transaction.id!, transaction);
                          }}
                        />
                      }
                      startContent={
                        <IconWrapper
                          className={
                            transaction.type == "income"
                              ? "bg-success/10 text-success"
                              : "bg-danger/10 text-danger"
                          }
                        >
                          <FontAwesomeIcon
                            className="text-lg "
                            icon={
                              transaction.type == "income"
                                ? faMoneyBillTrendUp
                                : faFileInvoiceDollar
                            }
                          />
                        </IconWrapper>
                      }
                    >
                      {transaction.description}
                    </ListboxItem>
                  ))
                ) : (
                  <ListboxItem key="no-records">
                    {` There's no transactions to show you`}
                  </ListboxItem>
                )}
              </Listbox>
            </Tab>
            <Tab
              key="expenses"
              title={
                <div className="flex items-center space-x-2">
                  <span>Expenses</span>
                </div>
              }
            >
              <Listbox
                aria-label="User Menu"
                className="full-w px-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1  overflow-visible shadow-small rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
              >
                {expensesTransaction().length ? (
                  expensesTransaction().map((transaction) => (
                    <ListboxItem
                      key={transaction.date ?? ""}
                      endContent={
                        <AmountItem
                          amount={
                            transaction.type == "income"
                              ? `+$${transaction.amount}`
                              : `-$${transaction.amount}`
                          }
                          onDelete={() => {
                            handleDelete(transaction.id);
                          }}
                          onEdit={() => {
                            handleEdit(transaction.id!, transaction);
                          }}
                        />
                      }
                      startContent={
                        <IconWrapper
                          className={
                            transaction.type == "income"
                              ? "bg-success/10 text-success"
                              : "bg-danger/10 text-danger"
                          }
                        >
                          <FontAwesomeIcon
                            className="text-lg "
                            icon={
                              transaction.type == "income"
                                ? faMoneyBillTrendUp
                                : faFileInvoiceDollar
                            }
                          />
                        </IconWrapper>
                      }
                    >
                      {transaction.description}
                    </ListboxItem>
                  ))
                ) : (
                  <ListboxItem key="no-records">
                    {` There's no transactions to show you`}
                  </ListboxItem>
                )}
              </Listbox>
            </Tab>
          </Tabs>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editMode ? "Edit Transaction" : "Add Transaction"}
              </ModalHeader>
              <ModalBody>
                <TransactionForm
                  selected={transaction.type}
                  onTransactionFormChange={handleRegisterFormChange}
                  amount={transaction.amount}
                  description={transaction.description}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    setEditMode(false);
                    clearForm();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;
