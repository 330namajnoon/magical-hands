import { useNavigate } from "react-router-dom";
import { serverURL } from "../../config";
import Translator from "../Translator";
import { Background, Presentation, ReservationButton, Title, Image, Information } from "./styles";
import routerAddresses from "../../constants/routerAddresses";

const HomePresentation = () => {
    const navigate = useNavigate();

    return (
        <Background>
            <Title>
                <Translator translationKey="homePresentationTitle" />
            </Title>
            <Presentation>
                <Translator translationKey="homePresentationText" />
            </Presentation>
            <Presentation>
                <Translator translationKey="homePresentationText2" />
            </Presentation>
            <ReservationButton onClick={() => navigate(routerAddresses.SERVICES)} >
                <Translator translationKey="homePresentationButtonText" />
            </ReservationButton>
            <Image src={`${serverURL}/images/MASAJE-RELAJANTE-1.jpg`} />
            <Title>
                <Translator translationKey="homePresentationInfoTitle" />
            </Title>
            <Information>
                <Translator translationKey="homePresentationInfoText1" />
            </Information>
            <Information>
                <Translator translationKey="homePresentationInfoText2" />
            </Information>

        </Background>
    );
}

export default HomePresentation;