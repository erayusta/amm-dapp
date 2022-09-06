import { useEffect, useState } from "react";
import "../styles.css";
import SwapComponent from "./SwapComponent";
import ProvideComponent from "./ProvideComponent";
import WithdrawComponent from "./WithdrawComponent";
import FaucetComponent from "./FaucetComponent";
import { PRECISION } from "../constants";

export default function ContainerComponent(props) {
    const [activeTab, setActiveTab] = useState("Swap");
    const [amountOfTOKEN1, setAmountOfTOKEN1] = useState(0);
    const [amountOfTOKEN2, setAmountOfTOKEN2] = useState(0);
    const [amountOfShare, setAmountOfShare] = useState(0);
    const [totalTOKEN1, setTotalTOKEN1] = useState(0);
    const [totalTOKEN2, setTotalTOKEN2] = useState(0);
    const [totalShare, setTotalShare] = useState(0);

    useEffect(() => {
        getHoldings();
    });

    // Fetch the pool details and personal assets details.
    async function getHoldings() {
        try {
            console.log("Fetching holdings----");
            let response = await props.contract.getMyHoldings();
            setAmountOfTOKEN1(response.amountToken1 / PRECISION);
            setAmountOfTOKEN2(response.amountToken2 / PRECISION);
            setAmountOfShare(response.myShare / PRECISION);

            response = await props.contract.getPoolDetails();
            setTotalTOKEN1(response[0] / PRECISION);
            setTotalTOKEN2(response[1] / PRECISION);
            setTotalShare(response[2] / PRECISION);
        } catch (err) {
            console.log("Couldn't Fetch holdings", err);
        }
    }

    const changeTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="centerBody">
            <div className="centerContainer">
                <div className="selectTab">
                    <div
                        className={"tabStyle " + (activeTab === "Swap" ? "activeTab" : "")}
                        onClick={() => changeTab("Swap")}
                    >
                        Swap
                    </div>
                    <div
                        className={
                            "tabStyle " + (activeTab === "Provide" ? "activeTab" : "")
                        }
                        onClick={() => changeTab("Provide")}
                    >
                        Provide
                    </div>
                    <div
                        className={
                            "tabStyle " + (activeTab === "Withdraw" ? "activeTab" : "")
                        }
                        onClick={() => changeTab("Withdraw")}
                    >
                        Withdraw
                    </div>
                    <div
                        className={
                            "tabStyle " + (activeTab === "Faucet" ? "activeTab" : "")
                        }
                        onClick={() => changeTab("Faucet")}
                    >
                        Faucet
                    </div>
                </div>

                {activeTab === "Swap" && (
                    <SwapComponent
                        contract={props.contract}
                        getHoldings={() => getHoldings()}
                    />
                )}
                {activeTab === "Provide" && (
                    <ProvideComponent
                        contract={props.contract}
                        getHoldings={() => getHoldings()}
                    />
                )}
                {activeTab === "Withdraw" && (
                    <WithdrawComponent
                        contract={props.contract}
                        maxShare={amountOfShare}
                        getHoldings={() => getHoldings()}
                    />
                )}
                {activeTab === "Faucet" && (
                    <FaucetComponent
                        contract={props.contract}
                        getHoldings={() => getHoldings()}
                    />
                )}
            </div>
            <div className="details">
                <div className="detailsBody">
                    <div className="detailsHeader">User Balance Details</div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Amount of TOKEN1:</div>
                        <div className="detailsValue">{amountOfTOKEN1}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Amount of TOKEN2:</div>
                        <div className="detailsValue">{amountOfTOKEN2}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Your Share:</div>
                        <div className="detailsValue">{amountOfShare}</div>
                    </div>
                    <div className="detailsHeader">Pool Balance Details</div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Total TOKEN1:</div>
                        <div className="detailsValue">{totalTOKEN1}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Total TOKEN2:</div>
                        <div className="detailsValue">{totalTOKEN2}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Total Shares:</div>
                        <div className="detailsValue">{totalShare}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}