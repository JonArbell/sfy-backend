export const mapToVisitorResponseDTO = (visitor) => {
    console.log(visitor);
    return {
        id: visitor.id,
        deviceType: visitor.deviceType,
        ipAddress: visitor.ipAddress,
        location: visitor.location
    };
};
