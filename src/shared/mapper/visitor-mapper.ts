import { VisitorResponseDTO } from "../../dtos/response/visitor-response.dto"

export const mapToVisitorResponseDTO = (visitor : any) : VisitorResponseDTO => {

    console.log(visitor);

    return {
        id : visitor.id,
        deviceType : visitor.deviceType,
        ipAddress : visitor.ipAddress,
        location : visitor.location
    }
}