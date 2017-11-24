from rest_framework import serializers

from words.models import User

class AwesomeUserSerizlier(serializers.ModelSerializer):
    words = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = User
        fields = (
            'id',
            'words',
        )