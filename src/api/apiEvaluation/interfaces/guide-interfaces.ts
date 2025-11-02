export interface TestGuide{
    testGuideId : string
    testGuideUrl : string
}

export interface TestGuideList{
    testGuideList : TestGuide []
}

export interface TestGuideRequest{
    testGuideId : string
    testGuideArchive : File
}