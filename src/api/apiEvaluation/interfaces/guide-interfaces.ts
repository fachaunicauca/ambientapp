export interface TestGuide{
    test_guide_id : string
    test_guide_url : string
}

export interface TestGuideList{
    test_guide_list : TestGuide []
}

export interface TestGuideRequest{
    test_guide_id : string
    test_guide_archive : File
}