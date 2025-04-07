import Image from "next/image";

type WalletProps = {
    namefirst: string;
    namelast: string;
    balance: string;
    color: string;
    borderColor: string;
    icon: string;
    balanceIcon: string;

}

const Wallet = ({ namefirst, namelast, balance, color, borderColor, icon, balanceIcon }: WalletProps) => {
    return (
        <div className={`flex h-[50px] justify-between items-center shrink-0 rounded-xl ${color}`}>
            <div className="flex items-center gap-3 self-stretch">
                <div className={`flex w-[50px] h-[50px] flex-col justify-center items-center rounded-xl border-[2px] border-solid ${borderColor}`}>
                    <Image src={icon} alt="icon" width={24} height={24} />
                </div>

                <div className="text-black font-semibold text-sm gap-0">
                <h1>{namefirst}</h1>
                <h1>{namelast}</h1>
                </div>
            </div>

            <div className="flex justify-end items-center gap-2 pr-4">
                <h2 className="text-black font-semibold text-xl">{balance}</h2>
                <Image src={balanceIcon} alt="balanceIcon" width={11} height={14} />
            </div>
        </div>
    );
}

export default Wallet;