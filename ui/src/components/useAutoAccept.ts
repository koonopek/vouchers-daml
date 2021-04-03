import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { useEffect } from "react";
import { Voucher } from '@daml.js/daml-vouchers';
import { ContractId } from "@daml/types";
import { useAlert } from "react-alert";


export function useAutoAcceptVoucherBalanceApprovals() {
    const ledger = useLedger();
    const party = useParty();
    const alert = useAlert();

    const voucherBalanceApprovals = useStreamQueries(Voucher.VoucherBalanceApprove, () => [{ owner: party }]).contracts;

    useEffect(() => {

        console.log(voucherBalanceApprovals);
        voucherBalanceApprovals.forEach(voucherBalanceApproval => ledger.exercise(Voucher.VoucherBalanceApprove.Accept, voucherBalanceApproval.contractId, voucherBalanceApproval.contractId)
            .then(() => alert.success('You received new wallet')));
    }, [voucherBalanceApprovals])
}

export function useAutoAcceptTransferApproval(voucherBalanceId: ContractId<Voucher.VoucherBalance>,) {
    const ledger = useLedger();
    const party = useParty();
    const alert = useAlert();

    const voucherTransferApprovals = useStreamQueries(Voucher.TransferApproval, () => [{ target: party }]).contracts;

    useEffect(() => {
        voucherTransferApprovals.forEach(transferApproval => ledger.exercise(Voucher.VoucherBalance.Receive, voucherBalanceId, { transferApprovalId: transferApproval.contractId })
            .then(() => alert.info('You received new vouchers')
            ));
    }, [voucherTransferApprovals]);
}

